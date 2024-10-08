import re
from urllib.parse import parse_qs, urlparse
import httpx
import yaml
from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, Request, Response, UploadFile, status

from Models.Methods import Methods
from Models.User import User
from Utils.Services import current_user, validate_route
from config.logger import logger


routes = {}

ms_router = APIRouter(prefix="/api")


async def redirect_post_user(request: Request, response: Response, json_data: Dict[str, Any]):
    logger.warning(request.url.path)
    target = routes[request.url.path]["endpoint"]
    method = routes[request.url.path]["method"]

    try:
        async with httpx.AsyncClient() as client:
            logger.warning(f'Redirigiendo a {target} ({method})')
            response_target = await client.post(target, json=json_data)

            response_target.raise_for_status()
    except httpx.RequestError as e:
        logger.error(
            f'Rediredcción error: {status.HTTP_503_SERVICE_UNAVAILABLE} {str(e)}  Target: {target} , Method: {method}')
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(e))

    response.status_code = response_target.status_code

    return response_target.json()


async def redirect_json(request: Request, response: Response, json_data: Dict[str, Any], user: User = Depends(current_user)):
    logger.warning(request.url.path)
    target = routes[request.url.path]["endpoint"]
    method = routes[request.url.path]["method"]

    try:
        async with httpx.AsyncClient() as client:
            logger.warning(f'Redirigiendo a {target} ({method})')
            if method == Methods.POST.value:
                response_target = await client.post(target, json=json_data)
            elif method == Methods.PUT.value:
                response_target = await client.put(target, json=json_data)
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"Method {method} not supported")
            response_target.raise_for_status()
    except httpx.RequestError as e:
        logger.error(
            f'Rediredcción error: {status.HTTP_503_SERVICE_UNAVAILABLE} {str(e)}  Target: {target} , Method: {method}')
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(e))

    response.status_code = response_target.status_code

    return response_target.json()


async def redirect_params(request: Request,response:Response , param: str, user: User = Depends(current_user)):
    # Analizar la URL de la solicitud
    target = routes[request.url.path]["endpoint"]
    method = routes[request.url.path]["method"]

    # Buscar todas las ocurrencias de contenido entre `{}` en el mensaje
    matches = re.findall(r"\{(.+?)\}", target)

    # Reemplazar cada ocurrencia con el contenido correspondiente
    for match in matches:
        target = target.replace("{" + match + "}", param)

    try:
        async with httpx.AsyncClient() as client:
            logger.warning(f'Redirigiendo a {target} ({method})')
            if method == Methods.DELETE.value:
                response_target = await client.delete(target)
            elif method == Methods.GET.value:
                response_target = await client.get(target)
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"Method {method} not supported")
            response_target.raise_for_status()
    except httpx.RequestError as e:
        logger.error(
            f'Rediredcción error: {status.HTTP_503_SERVICE_UNAVAILABLE} {str(e)}  Target: {target} , Method: {method}')
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(e))

    response.status_code = response_target.status_code

    return response_target.json()

# Función "redirect"


async def redirect(request: Request, response: Response, user: User = Depends(current_user)):
    target = routes[request.url.path]["endpoint"]
    method = routes[request.url.path]["method"]
    try:
        async with httpx.AsyncClient() as client:
            logger.warning(f'Redirigiendo a {target}')
            response_target = await client.get(target)
            # Lanza una excepción si la respuesta tiene un código de estado de error
            response_target.raise_for_status()
    except httpx.RequestError as e:
        logger.error(
            f' Redirection error: {status.HTTP_503_SERVICE_UNAVAILABLE}{str(e)}  Target: {target} , Method: {method}')
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(e))

    response.status_code = response_target.status_code

    return response_target.json()


async def image_route(file: UploadFile):
    return {"filename": file.filename}

with open("endpoints.yml", "r") as file:
    data = yaml.safe_load(file)

logger.warning("Creando endpoints")
for servicio, info_servicio in data["microservices"].items():
    puerto = info_servicio["port"]

    endpoints = info_servicio["endpoints"]
    for endpoint in endpoints:

        ruta = endpoint["route"]
        metodo = endpoint["method"]

        routes["/api"+ruta] = {
            "endpoint": f'http://localhost:{puerto}/{ruta}', "method": metodo}
            # "endpoint": f'http://{servicio.lower()}:{puerto}/api{ruta}', "method": metodo}

        valida, param = validate_route(ruta)

        funcion = redirect
        if param:
            funcion = redirect_params
        if metodo == Methods.POST.value or metodo == Methods.PUT.value:
            funcion = redirect_json
        if metodo == Methods.PATCH.value:
            funcion = image_route

        if servicio.lower() == "user" and metodo == Methods.POST.value:
            funcion = redirect_post_user

        if valida:
            ms_router.add_api_route(
                path=ruta,
                status_code=200,
                endpoint=funcion,
                methods=[metodo],
                tags=[servicio]
            )
        else:
            logger.error(f'Ruta no valida: {ruta}')

logger.warning("Rutas creadas")

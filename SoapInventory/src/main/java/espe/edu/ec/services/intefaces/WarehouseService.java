package espe.edu.ec.services.intefaces;

import espe.edu.ec.model.Warehouse;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

import java.util.List;

@WebService(serviceName = "warehouseWS")
public interface WarehouseService {
    @WebMethod
    void saveWarehouse(Warehouse warehouse);
    @WebMethod
    List<Warehouse> listAll();
    @WebMethod
    Warehouse getById(Long id);

}

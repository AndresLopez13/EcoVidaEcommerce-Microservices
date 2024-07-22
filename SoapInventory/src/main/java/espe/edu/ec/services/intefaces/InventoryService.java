package espe.edu.ec.services.intefaces;

import espe.edu.ec.model.Inventory;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService(serviceName = "inventoryWS")
public interface InventoryService {
    @WebMethod(operationName = "saveInventory")
    void saveInventory();

    @WebMethod(operationName = "getProductStock")
    Inventory getByProductId(Long id);

    @WebMethod(operationName = "listByWarehouseInventory")
    void getByWarehouseId(Long id);

    @WebMethod(operationName = "Product")
    void transactionProduct(Long id, int warehouseId,int quantity);

    @WebMethod(operationName = "Product")
    void transactionProduct(Long id, int warehouseId);
}

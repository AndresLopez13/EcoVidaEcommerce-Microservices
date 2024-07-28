package espe.edu.ec.services.intefaces;

import espe.edu.ec.model.Inventory;
import espe.edu.ec.model.Product;
import espe.edu.ec.model.Warehouse;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService(serviceName = "inventoryWS")
public interface InventoryService {
    @WebMethod(operationName = "saveInventory")
    void saveInventory(Product product, Warehouse warehouse, int quantity);

    @WebMethod(operationName = "getProductStock")
    Inventory getByProductIdAndWarehouseId(Long productId,Long warehouseId);

    @WebMethod(operationName = "Product")
    void transactionProduct(Long productId, Long warehouseId,int quantity);

    @WebMethod(operationName = "Product")
    void transactionProduct(Long productId, Long warehouseId);

    @WebMethod(operationName = "saveProduct")
    void saveProduct(Product product, Long warehouseId, int quantity);

}

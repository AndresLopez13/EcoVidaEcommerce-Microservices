package espe.edu.ec.services.intefaces;

import espe.edu.ec.model.Product;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

import java.util.List;

@WebService(serviceName = "productWS")
public interface ProductService {
    @WebMethod
    Product getById(int id);
    @WebMethod
    void saveProduct(Product product);
    @WebMethod
    List<Product> getAllProducts();
}

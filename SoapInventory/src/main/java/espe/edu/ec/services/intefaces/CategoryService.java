package espe.edu.ec.services.intefaces;

import espe.edu.ec.model.Category;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

import java.util.List;

@WebService(serviceName = "categoryWS")
public interface CategoryService {
    @WebMethod(operationName = "registerCategory")
    void saveCategory(Category category);
    @WebMethod(operationName = "categoryList")
    List<Category> listAll();
    @WebMethod
    Category getById(Long id);
}

package espe.edu.ec.services.impl;

import espe.edu.ec.model.Inventory;
import espe.edu.ec.model.Product;
import espe.edu.ec.model.Warehouse;
import espe.edu.ec.services.intefaces.InventoryService;
import jakarta.jws.WebService;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;

/**
 * Implementation of the InventoryService interface.
 */
@WebService(endpointInterface = "espe.edu.ec.services.intefaces.InventoryService")
public class InventoryServiceImpl implements InventoryService {

    private final EntityManagerFactory emf = Persistence.createEntityManagerFactory("myPersistenceUnit");

    /**
     * Saves the inventory of a product in a warehouse.
     * @param product
     * @param warehouse
     * @param quantity
     */
    @Override
    public void saveInventory(Product product, Warehouse warehouse, int quantity) {
        EntityManager em = null;
        try {
            em = emf.createEntityManager();
            em.getTransaction().begin();
            Inventory inventory = new Inventory();
            inventory.setProduct(product);
            inventory.setWarehouse(warehouse);
            inventory.setStock(quantity);
            em.persist(inventory);
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    /**
     * Gets the inventory of a product in a warehouse.
     * @param productId
     * @param warehouseId
     * @return
     */
    @Override
    public Inventory getByProductIdAndWarehouseId(Long productId, Long warehouseId) {
        EntityManager em = null;
        Inventory inventory = null;
        try {
            em = emf.createEntityManager();
            inventory = em.createQuery(
                            "SELECT i FROM Inventory i WHERE i.product.id = :productId AND i.warehouse.id = :warehouseId",
                            Inventory.class)
                    .setParameter("productId", productId)
                    .setParameter("warehouseId", warehouseId)
                    .getSingleResult();
        } catch (NoResultException e) {
            System.out.println("No inventory found for the given product and warehouse.");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
        return inventory;
    }

    /**
     * Processes a product transaction by decreasing the inventory quantity by the given quantity.
     *
     * @param productId  the ID of the product
     * @param warehouseId the ID of the warehouse
     * @param quantity the quantity to be decreased, positive - sell and negative - return
     */
    @Override
    public void transactionProduct(Long productId, Long warehouseId, int quantity) {
        EntityManager em = null;
        try {
            em = emf.createEntityManager();
            em.getTransaction().begin();
            Inventory inventory = em.createQuery(
                            "SELECT i FROM Inventory i WHERE i.product.id = :productId AND i.warehouse.id = :warehouseId",
                            Inventory.class)
                    .setParameter("productId", productId)
                    .setParameter("warehouseId", warehouseId)
                    .getSingleResult();


            if(inventory.getStockMin() > inventory.getStock() - quantity){
                System.out.println("Stock is less than the minimum stock.");
                return;
            }
            inventory.setStock(inventory.getStock() - quantity);
            em.merge(inventory);
            em.getTransaction().commit();
        } catch (NoResultException e) {
            System.out.println("No inventory found for the given product and warehouse.");
        } catch (Exception e) {
            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    /**
     * Processes a product transaction by decreasing the inventory quantity by 1.
     * @param productId the ID of the product
     * @param warehouseId the ID of the warehouse
     */
    @Override
    public void transactionProduct(Long productId, Long warehouseId) {
        transactionProduct(productId, warehouseId, 1);
    }

    @Override
    public void saveProduct(Product product, Long warehouseId, int quantity) {
        EntityManager em = null;
        try {
            em = emf.createEntityManager();
            em.getTransaction().begin();
            em.persist(product);
            Inventory inventory = new Inventory();
            inventory.setProduct(product);
            inventory.setWarehouse(em.find(Warehouse.class, warehouseId));
            inventory.setStock(quantity);
            em.persist(inventory);
            em.getTransaction().commit();
        } catch (Exception e) {
            if (em != null && em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }
}

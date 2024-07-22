package espe.edu.ec.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
public class Product {

    @Id
    private Long id;

    @Column(nullable = false,length = 255)
    private String name;
    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private Set<Inventory> inventories;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}

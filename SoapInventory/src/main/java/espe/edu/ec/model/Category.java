package espe.edu.ec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Category {
    @Id
    private Long id;

    @Column(nullable = false,length = 255)
    private String name;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

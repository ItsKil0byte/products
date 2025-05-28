package com.example.products.services;

import com.example.products.models.Item;
import com.example.products.repository.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemsService {

    @Autowired
    private ItemsRepository itemsRepository;

    public Iterable<Item> getAllItems() {
        return itemsRepository.findAll();
    }

    public void addItem(Item item) {
        itemsRepository.save(item);
    }

    public void deleteItem(Long id) {
        Optional<Item> item = itemsRepository.findById(id);
        if (item.isPresent()) {
            itemsRepository.deleteById(id);
        }
    }

    public void setPurchase(Long id) {
        Optional<Item> item = itemsRepository.findById(id);
        if (item.isPresent()) {
            Item x = item.get();
            x.setPurchased();
            itemsRepository.save(x);
        }
    }
}

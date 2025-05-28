package com.example.products.controllers;

import com.example.products.models.Item;
import com.example.products.services.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
public class APIController {

    @Autowired
    private ItemsService itemsService;

    @GetMapping("/get")
    public Iterable<Item> getItems() {
        return itemsService.getAllItems();
    }

    @PostMapping("/add")
    public void addItem(@RequestBody Item item) {
        itemsService.addItem(item);
    }

    @DeleteMapping("/delete")
    public void deleteItem(@RequestParam(name = "id") Long id) {
        itemsService.deleteItem(id);
    }

    @PatchMapping("/buy")
    public void setPurchase(@RequestParam(name = "id") Long id) {
        itemsService.setPurchase(id);
    }
}

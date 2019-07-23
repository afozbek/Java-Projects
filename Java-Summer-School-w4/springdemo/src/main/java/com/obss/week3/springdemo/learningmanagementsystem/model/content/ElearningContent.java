package com.obss.week3.springdemo.learningmanagementsystem.model.content;

import org.springframework.stereotype.Component;

@Component
public class ElearningContent extends Content {
    @Override
    public void calculateSuccess() {

        if (super.getSuccessRatio() > 20) {
            System.out.println("Congratulations 🎉🎉...");
        } else {
            System.out.println("You failed 😢😢..");
        }
    }
}

import Abstraction.Circle;
import Abstraction.Rectangle;
import Abstraction.Square;
import inheritance.Animal;
import inheritance.Cat;
import inheritance.Dog;
import inheritance.Tiger;

import java.awt.*;
import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
//        Scanner sc = new Scanner(System.in);
//        System.out.println("Enter student name");
//        String name = sc.nextLine();
//
//
//        Student stu = new Student("John", 20, "A");
//
//        stu.setAge(21);
//
//        stu.displayInfo();

//        Tiger tiger = new Tiger();
//        tiger.roar();
//
//        Dog dog = new Dog();
//        dog.bark();
//
//        Animal cat = new Cat();
//        cat.eat();

        Circle circle = new Circle(5, "Red");
        System.out.println("Area of Circle: " + circle.calculateArea());


        Square square = new Square(4, "Blue");
        System.out.println("Area of Square: " + square.calculateArea());

        Rectangle rectangle = new Rectangle(4, 6, "Green");
        System.out.println("Area of Rectangle: " + rectangle.calculateArea());
    }
}


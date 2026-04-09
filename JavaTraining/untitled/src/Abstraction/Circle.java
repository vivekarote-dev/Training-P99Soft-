package Abstraction;

public class Circle extends Shape{
    double radius;
    @Override
   public double calculateArea() {
        return Math.PI*radius*radius;
    }

   public Circle(double radius , String colour){
        this.radius = radius;
        this.colour = colour;
    }
}

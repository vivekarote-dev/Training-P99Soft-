package Abstraction;

public class Rectangle extends Shape{
    double length;
    double breadth;

    @Override
   public double calculateArea() {
        return length*breadth;
    }

   public Rectangle(double length , double breadth , String colour){
        this.length = length;
        this.breadth = breadth;
        this.colour = colour;
    }
}

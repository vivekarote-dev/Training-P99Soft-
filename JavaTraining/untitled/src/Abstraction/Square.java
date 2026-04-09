package Abstraction;

public class Square extends Shape {

    double side;

    @Override
   public double calculateArea() {
        return side*side;
    }

    public Square(double side , String colour){
        this.side = side;
        this.colour = colour;
    }
}

package EmployeeManagement;

public class Employee {
    private String name;
    private String designation;
    private double salary;

    public Employee(String name , String designation , double salary){
        this.name = name;
        this.designation = designation;
        this.salary = salary;

    }

    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void employeeInfo(){
        System.out.println("Name : " + name);
        System.out.println("Designation : " + designation);
        System.out.println("Salary : " + salary);
    }
}

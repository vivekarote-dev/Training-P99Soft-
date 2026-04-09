package EmployeeManagement;

import java.util.ArrayList;
import java.util.Scanner;

public class Ems {


    public static void main(String[] args) {
        ArrayList<Employee> employees = new ArrayList<>();

        while(true){
            System.out.println("1. Create Employee");
            System.out.println("2. Get Employee Info");
            System.out.println("3. Remove Employee");
            System.out.println("4. Exit");
            System.out.println("Enter your choice:");
            Scanner sc = new Scanner(System.in);
            int choice = sc.nextInt();
            switch(choice){
                case 1:
                    createEmployee(employees);
                    break;
                case 2:
                        getEmployeeInfo(employees);
                        break;

                case 3:
                    removeEmployee(employees);
                    break;
                case 4:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }





    }
    static void createEmployee(ArrayList<Employee> employees) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter employee name:");
        String name = sc.nextLine();
        System.out.println("Enter employee designation:");
        String designation = sc.nextLine();
        System.out.println("Enter employee salary:");
        double salary = sc.nextDouble();
        Employee newEmployee = new Employee(name, designation, salary);
        System.out.println("Employee created successfully!");
        newEmployee.employeeInfo();
        employees.add(newEmployee);

    }

    static void getEmployeeInfo(ArrayList<Employee> employees) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter employee name:");
        String name = sc.nextLine();
        for(Employee emp : employees){
            if(emp.getName().equalsIgnoreCase(name)){
                System.out.println("Employee found!");
                System.out.println("Name : " + emp.getName());
                System.out.println("Designation : " + emp.getDesignation());
                System.out.println("Salary : " + emp.getSalary());
                return;
            }
        }
        System.out.println("Employee not found!");
    }

    static void removeEmployee(ArrayList<Employee> employees) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter employee name:");
        String name = sc.nextLine();
        for(Employee emp : employees){
            if(emp.getName().equalsIgnoreCase(name)){
                employees.remove(emp);
                System.out.println("Employee removed successfully!");
                return;
            }
        }
        System.out.println("Employee not found!");
    }


}

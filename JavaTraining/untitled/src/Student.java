public class Student {
    private String name;
    private int age;
    private String grade;

    public Student(String name, int age, String grade){
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setAge(int Age){
        if (Age > 0) {
            this.age = Age;
        } else {
            System.out.println("Age must be positive.");
        }
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public String getGrade() {
        return grade;
    }

void displayInfo(){
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
    System.out.println("Grade: " + grade);
}
}

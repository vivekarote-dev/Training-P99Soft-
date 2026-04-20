class Student:
    
    
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
        print(f"Constructor: {self.name} created")

    def __str__(self):
        return f"Student: {self.name}, Marks: {self.marks}"

    
    def __del__(self):
        print(f"Destructor: {self.name} destroyed")

   
    @property
    def result(self):
        return "Pass" if self.marks >= 40 else "Fail"

    
    @classmethod
    def school_name(cls):
        return "Public School"


    @staticmethod
    def greet():
        return "Welcome to the Student System"



s1 = Student("Alice", 85);




print(s1)
print(f"Result: {s1.result}")
print(f"School Name: {Student.school_name()}") 
print(Student.greet())

del s1
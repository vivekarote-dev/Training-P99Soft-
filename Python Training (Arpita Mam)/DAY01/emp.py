class Employee:
    
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        print(f"Constructor: {self.name} created")

    def __str__(self):
        return f"Employee: {self.name}, Salary: {self.salary}"

    
    def __del__(self):
        print(f"Destructor: {self.name} destroyed")

   
    @property
    def status(self):
        return "High Earner" if self.salary >= 50000 else "Low Earner"

    
    @classmethod
    def company_name(cls):
        return "Tech Corp"

    
    @staticmethod
    def greet():
        return "Welcome to the Employee System"



e1 = Employee("John", 60000)


print(e1)
print(f"Status: {e1.status}")
print(f"Company Name: {Employee.company_name()}")
print(Employee.greet())

del e1
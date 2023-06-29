export class Employees {
    employees: Employee[]

    constructor(){
        this.employees = [];
    }
}

export class Employee{
    firstName!: string;
    lastName!: string;
    shopId: number;
}
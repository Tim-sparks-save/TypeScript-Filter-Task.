interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

export function logPerson(person: Person) {
    // We are using simple plus signs (+) now to avoid the $ errors
    var detail = person.type === 'admin' ? person.role : person.occupation;
    console.log(" - " + person.name + ", " + person.age + ", " + detail);
}

export function filterPersons(personType: 'user', criteria: Partial<Omit<User, 'type'>>): User[];
export function filterPersons(personType: 'admin', criteria: Partial<Omit<Admin, 'type'>>): Admin[];
export function filterPersons(personType: string, criteria: any): any[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof typeof criteria)[];
            return criteriaKeys.every((fieldName) => {
                return (person as any)[fieldName] === criteria[fieldName];
            });
        });
}

console.log('Users of age 23:');
filterPersons('user', { age: 23 }).forEach(logPerson);
console.log();
console.log('Admins of age 23:');
filterPersons('admin', { age: 23 }).forEach(logPerson);

const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 }
];

const numbers = [1, 2, 3, 4];

const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const person = {
    name: "Costas",
    address: {
        street: "Lalaland 12"
    }
};

const isTeenager = ({ age }) => age >= 10 && age <= 20;
const firstTeenager = people.find(isTeenager);
const allTeenagers = people.filter(isTeenager);
const isEveryPersonTeenager = people.every(isTeenager);
const hasTeenager = people.some(isTeenager);

const sum = numbers.reduce((total, number) => total + number, 0);
const product = numbers.reduce((total, number) => total * number, 1);

const companyNames = [];
companies.forEach(company => companyNames.push(company.name));

const companiesAfter1987 = companies.filter(company => company.start > 1987);
const retailCompanies = companies
    .filter(company => company.category === "Retail")
    .map(company => ({ ...company, start: company.start + 1 }));
const companiesByEndDate = [...companies].sort((a, b) => a.end - b.end);
const agesDescending = [...ages].sort((a, b) => b - a);
const totalAges = ages.reduce((total, age) => total + age, 0);

const { name: firstCompanyName, category: firstCompanyCategory } = companies[0];
const companyObject = {
    name: firstCompanyName,
    category: firstCompanyCategory,
    print() {
        return this.name;
    }
};

const sumArguments = (...values) => values.reduce((total, value) => total + value, 0);

function collectArguments(...values) {
    return values.reduce(
        (result, value) => result.concat(Array.isArray(value) ? value : [value]),
        []
    );
}

const { address: { street } } = person;

function createCounter() {
    let number = 0;
    return () => number++;
}

const counter = createCounter();
const counterResults = [counter(), counter(), counter()];

function parseQuery(url) {
    const query = url.split("?")[1] || "";

    return query.split("&").filter(Boolean).reduce((result, item) => {
        const [key, value] = item.split("=");
        result[key] = decodeURIComponent(value || "");
        return result;
    }, {});
}

const queryObject = parseQuery("https://example.com?name=John&age=20");

class Shape {
    constructor(color) {
        this.color = color;
    }

    getArea() {
        return 0;
    }

    toString() {
        return `Shape color: ${this.color}`;
    }
}

class Rectangle extends Shape {
    constructor(color, length, width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    toString() {
        return `Rectangle - ${super.toString()}`;
    }
}

class Triangle extends Shape {
    constructor(color, base, height) {
        super(color);
        this.base = base;
        this.height = height;
    }

    getArea() {
        return (this.base * this.height) / 2;
    }

    toString() {
        return `Triangle - ${super.toString()}`;
    }
}

const rectangle = new Rectangle("Blue", 10, 5);
const triangle = new Triangle("Green", 10, 6);

function getRandomNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const number = Math.floor(Math.random() * 10) + 1;

            if (number > 5) {
                resolve(number);
            } else {
                reject("Error");
            }
        }, 500);
    });
}

function showPromiseResult() {
    const resultElement = document.getElementById("promise-result");
    resultElement.textContent = "Waiting...";

    getRandomNumber()
        .then(number => {
            resultElement.textContent = `Random number: ${number}`;
        })
        .catch(error => {
            resultElement.textContent = error;
        });
}

function App() {
    return (
        <main>
            <section className="intro-section">
                <h1 className="hello-react">Hello <span>React</span></h1>
                <div className="logo-card">
                    <div className="react-symbol">⚛</div>
                    <p className="logo-caption">This is the React logo!</p>
                    <p>The library for web and native user interfaces</p>
                </div>
            </section>

            <nav className="navbar">
                <a className="active" href="#home">Home</a>
                <a href="#search">Search</a>
                <a href="#contact">Contact</a>
                <a className="login" href="#login">Login</a>
            </nav>

            <section className="basic-jsx">
                <h2>This is JSX</h2>
                <h3>Course names</h3>
                <ul>
                    <li>React</li>
                    <li>ReactNative</li>
                    <li>NodeJs</li>
                </ul>
            </section>

            <section>
                <h2>People array methods</h2>
                <p><strong>First teenager:</strong> {firstTeenager.name} ({firstTeenager.age})</p>
                <p><strong>All teenagers:</strong> {allTeenagers.map(item => item.name).join(", ")}</p>
                <p><strong>Every person is a teenager:</strong> {String(isEveryPersonTeenager)}</p>
                <p><strong>Has a teenager:</strong> {String(hasTeenager)}</p>
            </section>

            <section>
                <h2>Reduce and arrow functions</h2>
                <p><strong>Array:</strong> {numbers.join(", ")}</p>
                <p><strong>Sum:</strong> {sum}</p>
                <p><strong>Product:</strong> {product}</p>
            </section>

            <section>
                <h2>Companies</h2>
                <h3>Company names (forEach)</h3>
                <p>{companyNames.join(", ")}</p>

                <h3>Companies started after 1987</h3>
                <p>{companiesAfter1987.map(company => company.name).join(", ")}</p>

                <h3>Retail companies</h3>
                <div className="company-list">
                    {retailCompanies.map(company => (
                        <div className="company-row" key={company.name}>
                            <p>{company.name}</p>
                            <p>{company.category}</p>
                            <p>{company.start}</p>
                            <p>{company.end}</p>
                        </div>
                    ))}
                </div>

                <h3>Sorted by end date</h3>
                <p>{companiesByEndDate.map(company => `${company.name} (${company.end})`).join(", ")}</p>
            </section>

            <section>
                <h2>Other ES6 results</h2>
                <p><strong>Ages descending:</strong> {agesDescending.join(", ")}</p>
                <p><strong>Sum of ages:</strong> {totalAges}</p>
                <p><strong>New company object:</strong> {companyObject.print()} - {companyObject.category}</p>
                <p><strong>Sum unknown arguments:</strong> {sumArguments(1, 2, 3, 4, 5)}</p>
                <p><strong>Collect arguments:</strong> {collectArguments(1, [2, 3], "React", [true, false]).join(", ")}</p>
                <p><strong>Street:</strong> {street}</p>
                <p><strong>Counter:</strong> {counterResults.join(", ")}</p>
                <p><strong>Query object:</strong> {JSON.stringify(queryObject)}</p>
            </section>

            <section>
                <h2>Classes</h2>
                <p>{rectangle.toString()} - Area: {rectangle.getArea()}</p>
                <p>{triangle.toString()} - Area: {triangle.getArea()}</p>
            </section>

            <section>
                <h2>Promise</h2>
                <button type="button" onClick={showPromiseResult}>Generate random number</button>
                <p id="promise-result">Click the button to test the Promise.</p>
            </section>
        </main>
    );
}

export default App;

/**
     * Inheritance
     *  - one class inherits (child) the properties from another class (parent)
     *  - concreet classes can be parents - but have to be declared as 'virtual'
     */

public virtual class Car extends Vehicle {
    
    /*
    Encapsulation
    -Wrap related state and behavior into a single class
    -then you can control access to that state and behavior
    - private: only the defined class
    - protected: allows the class, subclasses, inner classes, and same package
    - public: everything in the namespace can see and access
    - global: everything can see it
    */

    private String engine;
    private String make;
    private string model;

    /** 
     * Final and Static
     *  - final: once the value is set it cannot be changed
     *  - static: once the variable is loaded in memory, it stays in memory
     * 
    */


    private final static Integer NUM_AXELS = 2;

    // no-arg constructors
    public Car() {
        super();
    }

    // variable constructor
    public Car(String engine, String make, String model){
        this.engine = engine;
        this.make = make;
        this.model = model;
    }

    // getters and setters
    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public String getMake() {
        return make;
    }
    
    public void setMake(String make) {
        this.make = make;
    }

    public String getModel()
    {
        return model;
    }

    public void setModel(String getModel){
        this.make = make;
    }

    /**
     * Polymorphism
     *  is the shit
     */
    public override String toString() {
        return 'Car: [' + this.engine + ', ' + this.make + ',' + this.model + ']';
    }

    public override void start() {
        System.debug('Starting ' + this.toString());
    }

    //virtual also lets me override on child classes
    public virtual void changeOil() {
        System.debug('Putting new oil in car.');
    }
}
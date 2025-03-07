/**
 * Abstract Class
 *  -can be used to make a blueprint
 *  -a class that can contain abstract methods
 *  -methods that are declared in parent class, but defined in child
 *  -abstract classes cannot be instanciated on their own
 */

public abstract class Vehicle {

    private Integer numWheels;

    public Vehicle() {
        System.debug('Setting Defaults in Vehicle Subclass');
    }

    public Vehicle(Integer numWheels)
    {
        this.numWheels = numWheels;
    }

    public Integer getNumWheels(){
        return numWheels;
    }
    
    public void setNumWheels(Integer numWheels){
        this.numWheels = numWheels;
    }

    //abstract method for how a vehicle is started
    public abstract void start();
}
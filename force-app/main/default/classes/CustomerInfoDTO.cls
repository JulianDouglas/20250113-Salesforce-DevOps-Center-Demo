public class CustomerInfoDTO {

    /**
     * Data Transfer Object
     *      - transform data from how it looks in the DB to how it looks in the request/response
     *      - DTO should match how the data looks in the req/resp
     *      - then you map the data to some existing object in your DB
     */
    Integer customerID; // attribute names need to be the same as they are in the JSON
    String createdOn;
    String firstName;
    String middleInitial;
    String lastName;
    String dob;
    String address;
    String city;
    String state;
    String zipCode;
    String phoneNumber;
    String email;
    String lastLoginDate;
    String lastTaxFilingDate;
    Boolean auditFlag;
    String password;

    public CustomerInfoDTO(String createdOn,String firstName,String middleInitial,
                            String lastName,String dob,String address,String city,String state,String zipCode,
                            String phoneNumber,String email,String lastLoginDate,String lastTaxFilingDate,Boolean auditFlag, String password) {
        System.debug('Created Customer Info DTO');

        this.createdOn = createdOn;
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.dob = dob;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.lastLoginDate = lastLoginDate;
        this.lastTaxFilingDate = lastTaxFilingDate;
        this.auditFlag = auditFlag;
        this.password = password;
    }

    // // DTO contain some mapping methods
    // public Customer dtoToCustomer(){
    //     // map customer info DTO -> regular customer object
    //     // return created customer
    // }
}


DemoHttpRequests httpReqs = new DemoHttpRequests();

httpReqs.getCustomer();

CustomerInfoDTO newCustomer = new CustomerInfoDTO(
    null,
    'Obi-Wan',
    'b',
    'Kenobi',
    null,
    '563 Bellon Tower #41512',
    'Courusant',
    'Jedi Temple',
    '1234',
    null,
    'bigBen420@fakeEmail.com',
    null,
    null,
    false,
    'password@1234'
);

httpReqs.createCustomer(newCustomer);
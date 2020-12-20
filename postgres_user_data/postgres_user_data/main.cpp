//
//  main.cpp
//  postgres_user_data
//
//  Created by Adam Saher on 2020-11-29.
//

#include <iostream>

void create() {
    std::cout << "INSERT INTO \"USERs\" (first_name, surname, email, password, \"createdAt\", \"updatedAt\")" << std::endl;
    
    std::cout << "VALUES ";
    for (unsigned i = 0; i < 100; ++i) {
        std::cout << "('first_name" << i << "', 'surname" << i << "', 'email_" << i <<
        "@gmail.com'" << ", 'Password" << i << "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)," << std::endl;
    }
}

int main(int argc, const char * argv[]) {
    
    create();
    return 0;
}

#include <stdio.h>
#include <string.h>


int sum(int a, int b) {
    printf("Hello from lib C memory! Calculating...\n");
    return a + b;
}

char user_name[100];

struct Person
{
    char name[150];
    char city[50];
};

struct Person person;

void set_person(struct Person user){

    strcpy(person.name, user.name);
    strcpy(person.city, user.city);

    printf("Saved User in c struct!\n");
    printf("New Person: name: %s , city: %s \n", person.name, person.city);


}

struct Person get_person(){
    return person;
}

void set_name(char name[100]) {
    printf("set_name using c: %s\n", name);
    //return name;
    strcpy(user_name, name);
}

char *get_name() {
    return user_name;
}

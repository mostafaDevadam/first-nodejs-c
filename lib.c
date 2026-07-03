#include <stdio.h>
#include <string.h>


int sum(int a, int b) {
    printf("Hello from lib C memory! Calculating...\n");
    return a + b;
}

char user_name[100];

void set_name(char name[100]) {
    printf("set_name using c: %s\n", name);
    //return name;
    strcpy(user_name, name);
}

char *get_name() {
    return user_name;
}

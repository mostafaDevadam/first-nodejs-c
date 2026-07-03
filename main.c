#include <stdio.h>

int sum(){
    //printf("sum from main c");
    return 5;
} 

int main() {
    //printf("Hello from main C!");
    int s = sum();
    printf("%d", s);
    return 0;
}

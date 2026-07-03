#define NAPI_VERSION 3
#include <node_api.h>

// 1. The core C function logic
napi_value Sum(napi_env env, napi_callback_info info) {
    size_t argc = 2;
    napi_value args[2];
    
    // Get the arguments passed from JavaScript
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);

    // Validate that 2 arguments were provided
    if (argc < 2) {
        napi_throw_type_error(env, NULL, "Two arguments are required");
        return NULL;
    }

    // Convert JS numbers into standard C doubles
    double value1, value2;
    napi_get_value_double(env, args[0], &value1);
    napi_get_value_double(env, args[1], &value2);

    // Perform standard C addition
    double result = value1 + value2;

    // Convert the C double back into a Node-API JavaScript number
    napi_value output;
    napi_create_double(env, result, &output);

    return output;
}

// 2. Register the function so Node.js can see it
napi_value Init(napi_env env, napi_value exports) {
    napi_value sum_function;
    
    // Create an exported JS function linked to our C 'Sum' function
    napi_create_function(env, "sum", NAPI_AUTO_LENGTH, Sum, NULL, &sum_function);
    
    // Attach the function to the module exports object
    napi_set_named_property(env, exports, "sum", sum_function);
    
    return exports;
}

// Macro to initialize the module native code structure
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)

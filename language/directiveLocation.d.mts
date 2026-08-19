/** @category Kinds */
/** The set of allowed directive location values. */
export declare const DirectiveLocation: {
    /** Directive location for query operations. */
    readonly QUERY: "QUERY";
    /** Directive location for mutation operations. */
    readonly MUTATION: "MUTATION";
    /** Directive location for subscription operations. */
    readonly SUBSCRIPTION: "SUBSCRIPTION";
    /** Directive location for field selections. */
    readonly FIELD: "FIELD";
    /** Directive location for fragment definitions. */
    readonly FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION";
    /** Directive location for fragment spreads. */
    readonly FRAGMENT_SPREAD: "FRAGMENT_SPREAD";
    /** Directive location for inline fragments. */
    readonly INLINE_FRAGMENT: "INLINE_FRAGMENT";
    /** Directive location for variable definitions. */
    readonly VARIABLE_DEFINITION: "VARIABLE_DEFINITION";
    /** Directive location for fragment variable definitions. */
    readonly FRAGMENT_VARIABLE_DEFINITION: "FRAGMENT_VARIABLE_DEFINITION";
    /** Directive location for schema definitions and extensions. */
    readonly SCHEMA: "SCHEMA";
    /** Directive location for scalar type definitions and extensions. */
    readonly SCALAR: "SCALAR";
    /** Directive location for object type definitions and extensions. */
    readonly OBJECT: "OBJECT";
    /** Directive location for field definitions. */
    readonly FIELD_DEFINITION: "FIELD_DEFINITION";
    /** Directive location for argument definitions. */
    readonly ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION";
    /** Directive location for interface type definitions and extensions. */
    readonly INTERFACE: "INTERFACE";
    /** Directive location for union type definitions and extensions. */
    readonly UNION: "UNION";
    /** Directive location for enum type definitions and extensions. */
    readonly ENUM: "ENUM";
    /** Directive location for enum value definitions. */
    readonly ENUM_VALUE: "ENUM_VALUE";
    /** Directive location for input object type definitions and extensions. */
    readonly INPUT_OBJECT: "INPUT_OBJECT";
    /** Directive location for input object field definitions. */
    readonly INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION";
    /** Directive location for directive definitions and extensions. */
    readonly DIRECTIVE_DEFINITION: "DIRECTIVE_DEFINITION";
};
/** The set of allowed directive location values. */
export type DirectiveLocation = (typeof DirectiveLocation)[keyof typeof DirectiveLocation];

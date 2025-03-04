package io.nology.todo_lists.common.validators.constraints;

import io.nology.todo_lists.common.validators.IsLowercase;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IsLowercaseValidator implements ConstraintValidator<IsLowercase, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.toLowerCase().equals(value);

    }

}

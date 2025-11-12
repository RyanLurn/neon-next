import { passwordValidator } from "@/features/auth/validators";
import { withFieldGroup } from "@/components/form/hook";

const PasswordConfirmFieldGroup = withFieldGroup({
  render: function Render({
    confirmPasswordLabel,
    passwordLabel,
    disabled,
    group,
  }) {
    return (
      <>
        <group.AppField
          children={(field) => (
            <field.FormTextInputField
              description="Must be at least 8 characters long."
              label={passwordLabel}
              disabled={disabled}
              type="password"
              required
            />
          )}
          validators={{
            onChange: passwordValidator,
          }}
          name="password"
        />
        <group.AppField
          validators={{
            onChange: ({ fieldApi, value }) => {
              if (value !== fieldApi.form.getFieldValue("password")) {
                return {
                  message: "Password does not match",
                };
              }
              return;
            },
            onChangeListenTo: ["password"],
          }}
          children={(field) => (
            <field.FormTextInputField
              description="Please confirm your password."
              label={confirmPasswordLabel}
              disabled={disabled}
              type="password"
              required
            />
          )}
          name="confirmPassword"
        />
      </>
    );
  },
  props: {
    confirmPasswordLabel: "Confirm Password",
    passwordLabel: "Password",
    disabled: false,
  },
  defaultValues: {
    confirmPassword: "",
    password: "",
  },
});

export { PasswordConfirmFieldGroup };

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

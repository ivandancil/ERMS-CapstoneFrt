import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../../components/Header";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
};

const AddEmployee = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };


  return (
    <Box m="20px">
      <Header title="ADD NEW EMPLOYEE" subtitle="Create a New Employee Profile" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: { xs: "span 4", sm: "span 2" } },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            {...register("firstName", { required: "First Name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{
              gridColumn: "span 2",
              "& .MuiInputLabel-root": {
                color: "white !important", 
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white !important", 
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white !important", 
                },
                "&:hover fieldset": {
                  borderColor: "white !important", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white !important", 
                },
              },
              "& .MuiInputBase-input": {
                color: "white", 
              },
              "& .MuiFormHelperText-root": {
                color: "white", 
              },
            }}
          />

           <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            {...register("lastName", { required: "Last Name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{
              gridColumn: "span 2",
              "& .MuiInputLabel-root": {
                color: "white !important", // Always white label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white !important", // Keep white when focused
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white !important", // White border
                },
                "&:hover fieldset": {
                  borderColor: "white !important", // White border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white !important", // White border when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "white", // Input text always white
              },
              "& .MuiFormHelperText-root": {
                color: "white", // Helper text always white
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              gridColumn: "span 2",
              "& .MuiInputLabel-root": {
                color: "white !important", // Always white label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white !important", // Keep white when focused
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white !important", // White border
                },
                "&:hover fieldset": {
                  borderColor: "white !important", // White border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white !important", // White border when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "white", // Input text always white
              },
              "& .MuiFormHelperText-root": {
                color: "white", // Helper text always white
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Contact Number"
            {...register("contact", { required: "Contact is required" })}
            error={!!errors.contact}
            helperText={errors.contact?.message}
            sx={{
              gridColumn: "span 2",
              "& .MuiInputLabel-root": {
                color: "white !important", // Always white label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white !important", // Keep white when focused
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white !important", // White border
                },
                "&:hover fieldset": {
                  borderColor: "white !important", // White border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white !important", // White border when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "white", // Input text always white
              },
              "& .MuiFormHelperText-root": {
                color: "white", // Helper text always white
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Address "
            {...register("address", { required: "Address is required" })}
            error={!!errors.address}
            helperText={errors.address?.message}
            sx={{
              gridColumn: "span 2",
              "& .MuiInputLabel-root": {
                color: "white !important", // Always white label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white !important", // Keep white when focused
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white !important", // White border
                },
                "&:hover fieldset": {
                  borderColor: "white !important", // White border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white !important", // White border when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "white", // Input text always white
              },
              "& .MuiFormHelperText-root": {
                color: "white", // Helper text always white
              },
            }}
          />
        
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEmployee
import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch, useAppSelector } from 'src/lib/redux/hooks'
import { register, selectStatus, selectUser, signIn } from 'src/lib/redux/reducers/userReducer'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(selectStatus)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    phone: '+972546690745',
    fullName: 'Daniel Hassan',
    email: 'Daniel@hassan.com',
    password: '123456',
    userName: 'zibiii',
  })
  const [showPassword, setShowPassword] = useState(true)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setForm({
      ...form,
      [name]: value,
    })
  }
  const handleSubmit = (e: any) => {
    console.log('submit')
    e.preventDefault()
    // Send the verification code to the user's phone number

    const data = {
      ...form,
    }
    dispatch(register(data))
      .unwrap()
      .then((res) => {
        alert(`success : ${JSON.stringify(res)}`)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          mb: 5,
        }}
      >
        {Object.keys(form).map((key) => (
          <TextField
            type={key === 'password' && !showPassword ? 'password' : 'text'}
            key={key}
            label={key}
            name={key}
            value={form[key]}
            onChange={onChange}
            sx={{
              width: '100%',
              mb: 2,
            }}
            InputProps={{
              endAdornment: key === 'password' && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
        ))}
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <div id="recaptcha-container" />
      </Box>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        loading={userStatus === 'loading'}
      >
        Register
      </LoadingButton>
    </>
  )
}

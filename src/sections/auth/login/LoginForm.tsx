import { useState, useEffect, ChangeEvent } from 'react'
import { RecaptchaVerifier } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { auth } from '../../../lib/firebase/index'
import { atom, useAtom } from 'jotai'
import { useAppDispatch, useAppSelector } from 'src/lib/redux/hooks'
import { selectStatus, selectUser, signIn } from 'src/lib/redux/reducers/userReducer'
import { VisibilityOff } from '@mui/icons-material'
import Visibility from '@mui/icons-material/Visibility'

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(selectStatus)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: 'daniel@bero-tech.com',
    password: '123456',
  })

  const [isDisabled, setIsDisabled] = useState(true)
  const [showPassword, setShowPassword] = useState(true)
  // useEffect(() => {
  //   const { phone, otp } = form

  //   setIsDisabled(phone.length === 13 && otp.length === 6)
  // }, [form.phone.length, form.otp.length])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setForm({
      ...form,
      [name]: value,
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { email, password } = form
    // Send the verification code to the user's phone number
    // const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container')

    const data = {
      email,
      password,
    }
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
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
        disabled={!isDisabled}
        loading={userStatus === 'loading'}
      >
        Login
      </LoadingButton>
    </>
  )
}

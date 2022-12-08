import { CircularProgress, Backdrop } from "@mui/material"

export const Loader = ({ loading = true }: { loading?: boolean }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

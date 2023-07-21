import { useToast } from 'vue-toast-notification'

class MiToast {
  toast = useToast()
  failed(message: string) {
    this.toast.error(message)
  }
  success(message = 'Success') {
    this.toast.success(message)
  }
}

export default MiToast

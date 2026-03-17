import { useAuthStore } from '../store/useAuthStore'

export function useProfile() {
  return useAuthStore((s) => s.profile)
}

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../config/supabaseClient'

export function useActivityFeed() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['activity_feed'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_feed')
        .select('*, reactions(*)')
        .order('created_at', { ascending: false })
        .limit(20)
      if (error) throw error
      return data ?? []
    },
    staleTime: 15_000,
  })

  useEffect(() => {
    const channel = supabase
      .channel('activity_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_feed' }, () => {
        queryClient.invalidateQueries({ queryKey: ['activity_feed'] })
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reactions' }, () => {
        queryClient.invalidateQueries({ queryKey: ['activity_feed'] })
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'reactions' }, () => {
        queryClient.invalidateQueries({ queryKey: ['activity_feed'] })
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [queryClient])

  return query
}

import { supabase } from '../config/supabaseClient'

export async function postActivity({ userId, username, teamId, subject, score, total, xpEarned }) {
  await supabase.from('activity_feed').insert({
    user_id: userId,
    username,
    team_id: teamId,
    subject,
    score,
    total,
    xp_earned: xpEarned,
  })
}

export async function toggleReaction({ eventId, userId, username, emoji }) {
  const { data } = await supabase
    .from('reactions')
    .select('id')
    .eq('event_id', eventId)
    .eq('reactor_user_id', userId)
    .eq('emoji', emoji)
    .maybeSingle()

  if (data) {
    await supabase.from('reactions').delete().eq('id', data.id)
  } else {
    await supabase.from('reactions').insert({
      event_id: eventId,
      reactor_user_id: userId,
      reactor_username: username,
      emoji,
    })
  }
}

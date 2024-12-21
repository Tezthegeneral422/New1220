import { supabase } from '../../lib/supabase';

export async function uploadProfilePicture(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/profile.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  // Update user profile with new avatar URL
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', userId);

  if (updateError) throw updateError;

  return publicUrl;
}

export async function getProfilePictureUrl(userId: string): Promise<string | null> {
  const { data } = await supabase.storage
    .from('avatars')
    .list(`${userId}`);

  if (!data || data.length === 0) return null;

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(`${userId}/profile.${data[0].name.split('.').pop()}`);

  return publicUrl;
}
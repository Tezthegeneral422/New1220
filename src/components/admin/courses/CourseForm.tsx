import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { ModuleForm } from './ModuleForm';
import { SkillSelector } from './SkillSelector';

interface CourseFormProps {
  courseId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function CourseForm({ courseId, onClose, onSuccess }: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    duration: '',
    level: 'Beginner',
    provider: '',
    is_published: false
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_skills (
            skill_id
          )
        `)
        .eq('id', courseId)
        .single();

      if (error) throw error;

      setFormData(data);
      setSelectedSkills(data.course_skills.map(cs => cs.skill_id));
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let courseResult;
      
      if (courseId) {
        // Update existing course
        courseResult = await supabase
          .from('courses')
          .update(formData)
          .eq('id', courseId)
          .select()
          .single();
      } else {
        // Create new course
        courseResult = await supabase
          .from('courses')
          .insert(formData)
          .select()
          .single();
      }

      if (courseResult.error) throw courseResult.error;

      // Update course skills
      if (courseResult.data) {
        await supabase
          .from('course_skills')
          .delete()
          .eq('course_id', courseResult.data.id);

        await supabase
          .from('course_skills')
          .insert(
            selectedSkills.map(skillId => ({
              course_id: courseResult.data.id,
              skill_id: skillId
            }))
          );
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {courseId ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  value={formData.level}
                  onChange={e => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <input
                  type="text"
                  value={formData.provider}
                  onChange={e => setFormData(prev => ({ ...prev, provider: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <SkillSelector
                selectedSkills={selectedSkills}
                onChange={setSelectedSkills}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={e => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                Publish course
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
'use client';
import React, { useEffect, useState } from 'react';
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/actions/article';
import { Heart, Users, PlusCircle, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Category, Type } from '@prisma/client';
import TiptapEditor from '../tiptap/tiptap-editor';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  type: Type;
}

const TYPE_OPTIONS: { name: string; icon: React.FC<any>; type: Type }[] = [
  { name: 'Couple', icon: Heart, type: Type.COUPLE },
  { name: 'Famille', icon: Users, type: Type.FAMILY },
];

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.LOVE_COMMUNICATION]: 'Communication Amoureuse',
  [Category.PLEASURE_AND_ACTIVITIES]: 'Plaisir et Activités',
  [Category.COUPLE_ADVICE]: 'Conseils de Couple',
  [Category.FAMILY_COMMUNICATION]: 'Communication Familiale',
  [Category.BONDING]: 'Liens',
  [Category.WELLBEING_AND_EVOLUTION]: 'Bien-être et Évolution',
};

export default function ManageArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeType, setActiveType] = useState<Type>(Type.COUPLE);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    description: '',
    image: '',
    type: Type.COUPLE,
    category: Category.LOVE_COMMUNICATION,
  });
  const [search, setSearch] = useState('');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const currentCategories: Category[] =
    activeType === Type.COUPLE
      ? [Category.LOVE_COMMUNICATION, Category.PLEASURE_AND_ACTIVITIES, Category.COUPLE_ADVICE]
      : [Category.FAMILY_COMMUNICATION, Category.BONDING, Category.WELLBEING_AND_EVOLUTION];

  // load & reset when type changes
  useEffect(() => {
    fetchArticles();
    // reset newArticle template
    setActiveCategory('all');
    setNewArticle((prev) => ({
      ...prev,
      type: activeType,
      category: currentCategories[0],
    }));
  }, [activeType]);

  const fetchArticles = async () => {
    const res = await getArticles();
    if (res.success) setArticles(res.data);
    else toast.error(res.error || 'Erreur lors du chargement');
  };

  const handleAdd = async () => {
    if (!newArticle.title || !newArticle.description || !newArticle.image) return toast.error('Champs obligatoires !');
    setIsAdding(true);
    const res = await createArticle(newArticle as Article);
    if (res.success) {
      toast.success('Article ajouté');
      setArticles((a) => [...a, res.data]);
      // reset form
      setNewArticle({
        title: '',
        description: '',
        image: '',
        type: activeType,
        category: currentCategories[0],
      });
    } else toast.error(res.error || 'Erreur');
    setIsAdding(false);
  };

  const handleUpdate = async () => {
    if (!editingArticle) return;
    setIsEditing(true);
    const res = await updateArticle(editingArticle.id, editingArticle);
    if (res.success) {
      toast.success('Article mis à jour');
      setArticles((a) => a.map((art) => (art.id === editingArticle.id ? editingArticle : art)));
      setEditingArticle(null);
    } else toast.error(res.error || 'Erreur');
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    const res = await deleteArticle(id);
    if (res.success) {
      toast.success('Supprimé');
      setArticles((a) => a.filter((art) => art.id !== id));
    } else toast.error(res.error || 'Erreur');
  };

  const filtered = articles.filter(
    (a) =>
      (activeCategory === 'all' || a.category === activeCategory) &&
      a.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex w-full flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Activités</h1>
            <p className="mt-1 text-gray-500">Ajoutez, modifiez ou supprimez les activités</p>
          </div>
          <div className="mb-6 flex gap-4">
            {TYPE_OPTIONS.map(({ name, icon: Icon, type }) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-md px-4 py-2 ${activeType === type ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>
                <Icon className="mr-2 inline" size={16} /> {name}
              </button>
            ))}
          </div>
        </div>

        {/* Type Switch */}

        {/* Filter & Search */}
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border px-4 py-2"
          />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value === 'all' ? 'all' : (e.target.value as Category))}
            className="rounded border px-4 py-2">
            <option value="all">Toutes</option>
            {currentCategories.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        {/* Add Article */}
        <div className="mb-4 space-y-2">
          <input
            placeholder="Titre"
            value={newArticle.title || ''}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            className="w-full rounded border px-4 py-2"
          />
          <TiptapEditor
            showExpandButton={false}
            placeholder="Description"
            onChange={(value) => setNewArticle({ ...newArticle, description: value })}
          />
          <input
            placeholder="Lien image"
            value={newArticle.image || ''}
            onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
            className="w-full rounded border px-4 py-2"
          />
          <select
            value={newArticle.category}
            onChange={(e) =>
              setNewArticle({
                ...newArticle,
                category: e.target.value as Category,
              })
            }
            className="rounded border px-4 py-2">
            {currentCategories.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="ml-2 rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50">
            {isAdding ? (
              <Loader2 className="mr-2 inline animate-spin" size={16} />
            ) : (
              <PlusCircle className="mr-2 inline" size={16} />
            )}
            Ajouter
          </button>
        </div>

        {/* List & Edit */}
        {filtered.map((article) => (
          <div key={article.id} className="mb-4 flex justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-semibold">{article.title}</h3>
              <small className="text-gray-500">{CATEGORY_LABELS[article.category]}</small>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditingArticle(article)}>
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(article.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {editingArticle && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-30 p-4">
            <div className=" flex h-[95vh] w-[80vw]  flex-col gap-2 rounded-lg bg-white p-6 md:h-[90vh]">
              <h2 className="mb-4 text-xl font-bold">Modifier l'article</h2>
              <input
                value={editingArticle.title}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    title: e.target.value,
                  })
                }
                className="mb-2 w-full rounded border px-4 py-2"
              />
              <TiptapEditor
                content={editingArticle.description}
                showExpandButton={false}
                minHeight={190}
                onChange={(value) =>
                  setEditingArticle({
                    ...editingArticle,
                    description: value,
                  })
                }
              />
              <input
                value={editingArticle.image}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    image: e.target.value,
                  })
                }
                className="mb-2 w-full rounded border px-4 py-2"
              />
              <select
                value={editingArticle.category}
                onChange={(e) =>
                  setEditingArticle({
                    ...editingArticle,
                    category: e.target.value as Category,
                  })
                }
                className="mb-2 w-full rounded border px-4 py-2">
                {currentCategories.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button onClick={() => setEditingArticle(null)} className="rounded bg-gray-200 px-4 py-2">
                  Annuler
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isEditing}
                  className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50">
                  {isEditing ? <Loader2 className="mr-2 inline animate-spin" size={16} /> : null}
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

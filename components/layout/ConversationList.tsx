'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Pin, MoveHorizontal as MoreHorizontal, CreditCard as Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ConversationListProps {
  searchTerm: string;
}

export function ConversationList({ searchTerm }: ConversationListProps) {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    deleteConversation,
    togglePin,
    updateConversationTitle,
  } = useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedConversations = filteredConversations.reduce((acc, conv) => {
    const now = new Date();
    const convDate = new Date(conv.updatedAt);
    const diffInHours = (now.getTime() - convDate.getTime()) / (1000 * 60 * 60);
    
    let group = 'Older';
    if (diffInHours < 24) {
      group = 'Today';
    } else if (diffInHours < 48) {
      group = 'Yesterday';
    } else if (diffInHours < 168) { // 7 days
      group = 'Last 7 days';
    }

    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(conv);
    return acc;
  }, {} as Record<string, typeof conversations>);

  // Sort pinned conversations to the top
  Object.keys(groupedConversations).forEach(group => {
    groupedConversations[group] = groupedConversations[group].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  });

  const handleEdit = (conv: any) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      updateConversationTitle(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'Today':
        return <Clock className="w-3 h-3" />;
      case 'Yesterday':
        return <Calendar className="w-3 h-3" />;
      case 'Last 7 days':
        return <Calendar className="w-3 h-3" />;
      default:
        return <Calendar className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {Object.entries(groupedConversations).map(([group, convs]) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
              {getGroupIcon(group)}
              <span className="uppercase tracking-wider">{group}</span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                {convs.length}
              </span>
            </div>
            
            <div className="space-y-1">
              {convs.map((conv) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`group relative rounded-lg border p-3 cursor-pointer transition-all hover:bg-accent ${
                    activeConversationId === conv.id 
                      ? 'bg-[#007AFF]/10 border-[#007AFF]/20' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setActiveConversation(conv.id)}
                  layout
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-muted rounded-md shrink-0">
                      <MessageSquare className="w-3 h-3" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {editingId === conv.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit();
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                            onBlur={handleSaveEdit}
                            className="flex-1 bg-transparent border-b border-[#007AFF] text-sm focus:outline-none"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm truncate">
                              {conv.title}
                            </h3>
                            {conv.pinned && (
                              <Pin className="w-3 h-3 text-[#007AFF] fill-current shrink-0" />
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {conv.messages.length} messages
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => togglePin(conv.id)}>
                          <Pin className="w-3 h-3 mr-2" />
                          {conv.pinned ? 'Unpin' : 'Pin'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(conv)}>
                          <Edit2 className="w-3 h-3 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteConversation(conv.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-3 h-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredConversations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-muted-foreground"
        >
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">
            {searchTerm ? 'No conversations found' : 'No conversations yet'}
          </p>
          <p className="text-xs mt-1">
            {searchTerm ? 'Try a different search term' : 'Start a new chat to get going'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
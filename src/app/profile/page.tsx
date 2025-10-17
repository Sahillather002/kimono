"use client"

import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, User as UserIcon, Calendar } from 'lucide-react'

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { user } = useAuth()

  if (!user) return null

  const joinDate = new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-3xl bg-red-600 text-white">
                    {user.user_metadata?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-3xl">
                {user.user_metadata?.username || 'User'}
              </CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Anime Enthusiast
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
                    <UserIcon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Username</p>
                      <p className="text-sm">{user.user_metadata?.username || 'Not set'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                      <p className="text-sm">{joinDate}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold text-red-600">0</p>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold text-red-600">0</p>
                      <p className="text-sm text-muted-foreground">Watchlist</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold text-red-600">0</p>
                      <p className="text-sm text-muted-foreground">Watched</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t flex justify-center">
                  <Button variant="outline" size="lg">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

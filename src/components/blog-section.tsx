"use client"

import { useState } from "react"
import { Search, Calendar, Clock, Tag, ChevronRight, Filter } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: number
  category: string
  tags: string[]
  image: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps and beyond.",
    content: "Full article content would go here...",
    author: {
      name: "Sarah Johnson",
      avatar: "/user-2.png?height=40&width=40",
      role: "Senior Developer",
    },
    publishedAt: "2024-01-15",
    readTime: 8,
    category: "Technology",
    tags: ["Web Development", "AI", "Trends", "PWA"],
    image: "/code.png?height=300&width=500",
    featured: true,
  },
  {
    id: "2",
    title: "Building Scalable Applications with Modern Architecture",
    excerpt:
      "Learn how to design and implement scalable applications using microservices, containerization, and cloud-native technologies.",
    content: "Full article content would go here...",
    author: {
      name: "Michael Chen",
      avatar: "/user-1.png?height=40&width=40",
      role: "Solutions Architect",
    },
    publishedAt: "2024-01-12",
    readTime: 12,
    category: "Architecture",
    tags: ["Microservices", "Docker", "Kubernetes", "Cloud"],
    image: "/typing.png?height=300&width=500",
  },
  {
    id: "3",
    title: "UX Design Principles That Drive User Engagement",
    excerpt:
      "Discover the key UX design principles that can significantly improve user engagement and conversion rates on your platform.",
    content: "Full article content would go here...",
    author: {
      name: "Emily Rodriguez",
      avatar: "/user-2.png?height=40&width=40",
      role: "UX Designer",
    },
    publishedAt: "2024-01-10",
    readTime: 6,
    category: "Design",
    tags: ["UX Design", "User Engagement", "Conversion", "UI"],
    image: "/brackets.png?height=300&width=500",
  },
  {
    id: "4",
    title: "Cybersecurity Best Practices for Modern Applications",
    excerpt:
      "Essential security measures every developer should implement to protect applications from common vulnerabilities and threats.",
    content: "Full article content would go here...",
    author: {
      name: "David Thompson",
      avatar: "/user-1.png?height=40&width=40",
      role: "Security Engineer",
    },
    publishedAt: "2024-01-08",
    readTime: 10,
    category: "Security",
    tags: ["Cybersecurity", "Security", "Best Practices", "Vulnerabilities"],
    image: "/coding.png?height=300&width=500",
  },
  {
    id: "5",
    title: "The Rise of AI in Software Development",
    excerpt:
      "How artificial intelligence is transforming the software development process and what it means for developers.",
    content: "Full article content would go here...",
    author: {
      name: "Lisa Park",
      avatar: "/user-2.png?height=40&width=40",
      role: "AI Researcher",
    },
    publishedAt: "2024-01-05",
    readTime: 9,
    category: "Technology",
    tags: ["AI", "Machine Learning", "Development", "Automation"],
    image: "/code.png?height=300&width=500",
  },
  {
    id: "6",
    title: "Performance Optimization Techniques for React Applications",
    excerpt: "Practical tips and techniques to optimize React application performance and improve user experience.",
    content: "Full article content would go here...",
    author: {
      name: "Alex Kumar",
      avatar: "/user-1.png?height=40&width=40",
      role: "Frontend Developer",
    },
    publishedAt: "2024-01-03",
    readTime: 7,
    category: "Development",
    tags: ["React", "Performance", "Optimization", "Frontend"],
    image: "/brackets.png?height=300&width=500",
  },
]

const categories = ["All", "Technology", "Architecture", "Design", "Security", "Development"]

export default function BlogSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visiblePosts, setVisiblePosts] = useState(6)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const displayedPosts = filteredPosts.slice(0, visiblePosts)
  const featuredPost = blogPosts.find((post) => post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 6)
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest insights, tutorials, and industry trends from our team of experts.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
            title="blog-types"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {featuredPost.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={featuredPost.author.avatar || "/placeholder.svg"}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                    <p className="text-sm text-gray-500">{featuredPost.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </div>
              </div>

              <button className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Read Full Article
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {displayedPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
          >
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-flex items-center text-xs text-gray-500">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>

                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Read More</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {visiblePosts < filteredPosts.length && (
        <div className="text-center">
          <button
            onClick={loadMorePosts}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Load More Articles
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or category filter to find what you&apos;re looking for.
          </p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss our latest articles, tutorials, and industry insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          />
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}

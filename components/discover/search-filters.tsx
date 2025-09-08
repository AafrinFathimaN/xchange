"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
}

const skillCategories = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Writing",
  "Languages",
  "Music",
  "Art",
  "Cooking",
  "Fitness",
  "Photography",
  "Education",
]

const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Portuguese", "Italian"]

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    location: "",
    radius: [50],
    skillCategories: [] as string[],
    languages: [] as string[],
    rating: [4],
    availability: [] as string[],
    meetingType: "any", // Updated default value
    isOnline: false,
    isVolunteer: false,
    isNewcomer: false,
  })

  const updateFilters = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleArrayFilter = (key: "skillCategories" | "languages" | "availability", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilters(key, newArray)
  }

  const clearFilters = () => {
    const clearedFilters = {
      location: "",
      radius: [50],
      skillCategories: [],
      languages: [],
      rating: [4],
      availability: [],
      meetingType: "any", // Updated default value
      isOnline: false,
      isVolunteer: false,
      isNewcomer: false,
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Search Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Location */}
        <div className="space-y-3">
          <Label>Location</Label>
          <Input
            placeholder="City, State, Country"
            value={filters.location}
            onChange={(e) => updateFilters("location", e.target.value)}
          />
          <div className="space-y-2">
            <Label>Radius: {filters.radius[0]} miles</Label>
            <Slider
              value={filters.radius}
              onValueChange={(value) => updateFilters("radius", value)}
              max={200}
              min={5}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        {/* Skill Categories */}
        <div className="space-y-3">
          <Label>Skill Categories</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {skillCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.skillCategories.includes(category)}
                  onCheckedChange={() => toggleArrayFilter("skillCategories", category)}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <Label>Languages</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={() => toggleArrayFilter("languages", language)}
                />
                <Label htmlFor={language} className="text-sm">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label>Minimum Rating: {filters.rating[0]} stars</Label>
          <Slider
            value={filters.rating}
            onValueChange={(value) => updateFilters("rating", value)}
            max={5}
            min={1}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Meeting Type */}
        <div className="space-y-3">
          <Label>Meeting Preference</Label>
          <Select value={filters.meetingType} onValueChange={(value) => updateFilters("meetingType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="online">Online only</SelectItem>
              <SelectItem value="in-person">In-person only</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Special Filters */}
        <div className="space-y-3">
          <Label>Special Filters</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOnline"
                checked={filters.isOnline}
                onCheckedChange={(checked) => updateFilters("isOnline", checked)}
              />
              <Label htmlFor="isOnline" className="text-sm">
                Currently online
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isVolunteer"
                checked={filters.isVolunteer}
                onCheckedChange={(checked) => updateFilters("isVolunteer", checked)}
              />
              <Label htmlFor="isVolunteer" className="text-sm">
                Volunteers only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNewcomer"
                checked={filters.isNewcomer}
                onCheckedChange={(checked) => updateFilters("isNewcomer", checked)}
              />
              <Label htmlFor="isNewcomer" className="text-sm">
                Newcomers only
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.skillCategories.length > 0 || filters.languages.length > 0) && (
        <div className="space-y-2">
          <Label>Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {filters.skillCategories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleArrayFilter("skillCategories", category)} />
              </Badge>
            ))}
            {filters.languages.map((language) => (
              <Badge key={language} variant="outline" className="flex items-center gap-1">
                {language}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleArrayFilter("languages", language)} />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

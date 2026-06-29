package com.forum.app.service;

import com.forum.app.entity.Tag;
import com.forum.app.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag createTag(Tag tag) {
        tag.setId(null);
        return tagRepository.save(tag);
    }

    public List<Tag> readAllTags() {
        return tagRepository.findAll();
    }

    public List<Tag> resolveTags(List<Tag> tags) {
        List<Tag> finalTags = new ArrayList<>();

        if (tags == null) {
            return finalTags;
        }
        for(Tag tag : tags) {
            String tagName = tag.getName().trim().toLowerCase();

            boolean alreadyExists = finalTags.stream()
                    .anyMatch(t -> t.getName().equals(tagName));

            if (alreadyExists) {
                continue;
            }
            Optional<Tag> existingTag = tagRepository.findByName(tagName);

            if(!existingTag.isPresent()) {
                Tag newTag = new Tag();
                newTag.setName(tagName);
                newTag=createTag(newTag);
                finalTags.add(newTag);
            }
            else{
                finalTags.add(existingTag.get());
            }
        }
        return finalTags;
    }

}

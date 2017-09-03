package com.ds.tree.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tree_node")
public class TreeNode {

	@Id
	@Column(name = "ID")
	private Integer id;

	@Column(name = "PARENT_ID")
	private Integer parentId;

	@Column(name = "NODE_TEXT")
	private String text;
	
	@Column(name = "LEVEL")
	private int level;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
}

package com.ds.tree.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ds.tree.entity.TreeNode;

public interface TreeNodeRepository extends JpaRepository<TreeNode, Integer> {

	public List<TreeNode> findByParentId(Integer id);

}
